package main

import (
	"flag"
	"fmt"
	"log"

	"imgfixr/imgproc"
)

var (
	inputPath  string
	outputPath string
)

func init() {
	flag.StringVar(&inputPath, "in", "", "Path to input image (PNG, JPEG, etc.)")
	flag.StringVar(&outputPath, "out", "", "Path to output PNG")
}

var (
	TargetWhiteBG = imgproc.MaskConfig{
		Mode: imgproc.MaskHSV,

		HSVTargetH: 0,
		HSVTolH:    10,
		HSVMinS:    0,
		HSVMaxS:    1,
		HSVMinV:    0,
		HSVMaxV:    1,
	}

	TargetMagentaBG = imgproc.MaskConfig{
		Mode: imgproc.MaskHSV,

		HSVTargetH: 300,
		HSVTolH:    40,
		HSVMinS:    .125,
		HSVMaxS:    1,
		HSVMinV:    .125,
		HSVMaxV:    1,
	}

	TargetGreenBG = imgproc.MaskConfig{
		Mode: imgproc.MaskHSV,

		HSVTargetH: 120,
		HSVTolH:    40,
		HSVMinS:    .1,
		HSVMaxS:    1,
		HSVMinV:    .1,
		HSVMaxV:    1,
	}
)

func main() {
	flag.Parse()
	if inputPath == "" || outputPath == "" {
		log.Fatal("You must specify both -in and -out paths.")
	}

	// 1) Load input image
	srcImg, err := imgproc.LoadImage(inputPath)
	if err != nil {
		log.Fatalf("Failed to load input image: %v", err)
	}

	// 2) Pad to square, centering original
	square := imgproc.PadToSquare(srcImg)

	// 3) Scale up (e.g. factor = 4)
	scaled := imgproc.ScaleImage(square, 8.0)

	// Convert to RGBA for pixel‐level editing
	rgba := imgproc.ImageToRGBA(scaled)

	// // 4) Remove background (quick parallel pass)
	// imgproc.RemoveBackgroundParallel(rgba, 255, 0, 255, 192)

	// // 5) Iterative flood‐fill removal on any leftover “magentaish” (edge cleanup = 1)
	// imgproc.RemoveBackgroundIterative(rgba, 255, 0, 255, 192, 1)

	imgproc.RemoveBackgroundSmartWithConfig(rgba, TargetMagentaBG)

	// imgproc.Recolor(rgba, 0, 0, 0, .45)

	// 6) Fuzz border pixels
	imgproc.FuzzBorders(rgba)

	imgproc.Recolor(rgba, 255, 255, 255, .25)
	imgproc.RemoveBackgroundSmartWithConfig(rgba, TargetGreenBG)

	imgproc.Recolor(rgba, 0, 0, 0, .55)
	imgproc.SmoothEdgesWithColor(rgba, 4, 20, 20, 20)

	// 7) Center & crop to tight square
	final := imgproc.CenterAndCrop(rgba)

	// imgproc.FuzzBorders(rgba)
	// imgproc.SmoothEdges(final, 4)

	// 8) Save as PNG
	if err := imgproc.SavePNG(outputPath, imgproc.ScaleImage(final, .25)); err != nil {
		log.Fatalf("Failed to save output: %v", err)
	}

	fmt.Println("Done!")
}
