import resizer from 'image-resizer-js';
import Compressor from 'compressorjs';
import loadImage from 'blueimp-load-image';

type num = number;

function compress(file: File): Promise<Blob> {
  return new Promise(resolve => {
    new Compressor(file, {
      quality: 0.9,
      resize: 'none',
      success(result) {
        resolve(result)
      }
    })
  })
}

function calcRatio(width: num, height: num) {
  let max = Math.max(width, height)

  if(max > 2040){
    let x = max - 2040
    let percent = (x * 100)/max
    percent /= 100
    width = Math.ceil(width - width * percent)
    height = Math.ceil(height - height * percent)
  }

  return {width, height}
}

interface IToFile {
  name: string;
  type: string;
}

function canvasToBlob(image: HTMLCanvasElement): Promise<Blob> {
  return new Promise(resolve => {
    image.toBlob(blob => {
        resolve(blob as Blob)        
    })
  });
}

function arrBufferToFile(buffer: ArrayBuffer, file: File): File {
  return new File([buffer], file.name, {type: file.type})
}

const minify = (file: File): Promise<File> => {
    return new Promise(resolve => {
        let img = new Image()
            
        let url = URL.createObjectURL(file)

        img.onload = function () {
            let el = this as HTMLImageElement;

            let size: any = calcRatio(el.width, el.height)

            loadImage(file, {orientation: true, canvas: true})
              .then(result => canvasToBlob(result.image as HTMLCanvasElement))
              .then(blob => blob.arrayBuffer())
              .then(buffer => resizer(buffer, size.width, size.height, 100))
              .then(buffer => arrBufferToFile(buffer, file))
              .then(newfile => compress(newfile))
              .then(buffer => {
                  let resized = new File([buffer], file.name, {
                      type: file.type,
                  })    
                  resolve(resized)
              })

            URL.revokeObjectURL(url)
        }

        img.src = url;
    })
}



export const debug = (file: File) => {
    file.arrayBuffer().then(buffer => {
        let image = new Image()

        image.src = URL.createObjectURL(new Blob([buffer]))

        document.body.appendChild(image)
    }) 
}

export default minify