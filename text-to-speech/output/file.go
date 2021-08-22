package output

import (
	"fmt"
	"io/ioutil"
	"os"
	"sync"
)

var lock sync.Mutex

type FileOutputer struct {
	path string
}

func NewFileOutputer(path string) FileOutputer {
	return FileOutputer{path: path}
}

func (f FileOutputer) Output(bytes []byte, fileName string) error {
	fmt.Printf("output file '%s' to %s. file length: %d\n", fileName, f.path, len(bytes))

	// mkdir
	if !isDir(f.path) {
		lock.Lock()
		defer lock.Unlock()
		if !isDir(f.path) {
			err := os.MkdirAll(f.path, os.ModePerm)
			if err != nil {
				return err
			}
		}
	}

	return ioutil.WriteFile(f.path+"/"+fileName, bytes, os.ModePerm)
}

func isDir(path string) bool {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		return false
	}
	return true
}
