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
	scaled := imgproc.ScaleImage(square, 14.0)

	// Convert to RGBA for pixel‐level editing
	rgba := imgproc.ImageToRGBA(scaled)

	// // 4) Remove background (quick parallel pass)
	// imgproc.RemoveBackgroundParallel(rgba, 255, 0, 255, 192)

	// // 5) Iterative flood‐fill removal on any leftover “magentaish” (edge cleanup = 1)
	// imgproc.RemoveBackgroundIterative(rgba, 255, 0, 255, 192, 1)

	const tol = 40
	imgproc.RemoveBackgroundSmartWithConfig(rgba, imgproc.MaskConfig{
		Mode: imgproc.MaskHSV, // or MaskRGB, or MaskEnsemble

		HSVTargetH: 300,
		HSVTolH:    tol,
		HSVMinS:    0.1,
		HSVMaxS:    1.0,
		HSVMinV:    0.1,
		HSVMaxV:    1.0,
	})

	// 6) Fuzz border pixels
	imgproc.FuzzBorders(rgba)

	// 7) Center & crop to tight square
	final := imgproc.CenterAndCrop(rgba)

	imgproc.SmoothEdges(final, 2)

	// 8) Save as PNG
	if err := imgproc.SavePNG(outputPath, imgproc.ScaleImage(final, .25)); err != nil {
		log.Fatalf("Failed to save output: %v", err)
	}

	fmt.Println("Done!")
}
