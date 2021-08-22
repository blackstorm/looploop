package main

import (
	"flag"
	"fmt"
	"sync"

	"github.com/blackstorm/looplooper/text2speech/audio"
	"github.com/blackstorm/looplooper/text2speech/azure"
	"github.com/blackstorm/looplooper/text2speech/input"
	"github.com/blackstorm/looplooper/text2speech/output"
)

func main() {
	// parse args
	inputPath := flag.String("input", "", "文本文件目录")
	outputPath := flag.String("output", "", "文本文件目录")
	flag.Parse()

	// check args
	if len(*inputPath) == 0 || len(*outputPath) == 0 {
		panic("Must set 'input' and 'output' path to args. example: --input=/tmp/input.json --output=/tmp/dist")
	}

	// init azure client
	azClient, err := azure.NewClientAndInit()
	if err != nil {
		panic(err)
	}

	// read input files
	inputer, err := input.NewInputer(*inputPath)
	if err != nil {
		panic(err)
	}

	// build a outputer
	fileOutputer := output.NewFileOutputer(*outputPath)

	var wg sync.WaitGroup
	// do
	for _, a := range inputer.Audios {
		wg.Add(1)
		go func(item audio.Audio) {
			bytes, err := azClient.Text2Speech(item, "mp3")
			if err != nil {
				fmt.Printf("Text2Speech %s error %v \n", item.Name, err)
			} else {
				err := fileOutputer.Output(bytes, item.Name)
				if err != nil {
					fmt.Printf("Text2Speech %s error %v \n", item.Name, err)
				}
			}
			wg.Done()
		}(a)
	}

	wg.Wait()
}
