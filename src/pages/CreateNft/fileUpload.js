import { useRef, useState } from 'react'
import FileIcon from "../../assests/file.png"
import { useUploader } from '@w3ui/react-uploader'

export default function FileUpload({fileVideo, setFile, setDataCid}) {



        const [file,setVideo]=useState({
            src: "",
            alt: "upload an image",
          })
    
        const hiddenFileInput = useRef(null)
        const [, uploader] = useUploader()


        const handleClick = async(event )=> {
            event.preventDefault()
            hiddenFileInput.current.click()
          

        }
    
        const handleChange = e => {
            const fileUploaded = e.target.files[0]
            if (fileUploaded) {
                setVideo({
                    src: URL.createObjectURL(fileUploaded),
                    alt: fileUploaded.name,
                });
            }
            setFile(fileUploaded)
        }
    
        const handleRemoveFile = () => {
            setFile({})
           // handleFile(null)
        }
    
  return (
    
    <div className='w-full min-h-min py-6 relative rounded-[5px] border border-dashed border-[#8A92B2] grid place-items-center'>
       {
                file.src ? (
                    <div className='flex flex-col space-y-4'>
                        <video src={file.src} alt="" />
        
                    </div>
                   
                ) : ( 
                    <div className="flex flex-col items-center">
                        <img src={FileIcon} alt="" />
                        <p className="text-sm leading-4 capitalize text-[#62646C] text-center mt-4 mb-3">Images, videos, gifs and music files (Maximum 100MB)</p>
                        <button className="w-[134px] rounded-lg h-[42px] btn-color text-black"
                         onClick={handleClick}
                         >
                            Upload file
                        </button>
                           
                           
                       
                        <input
                            type="file"
                            ref={hiddenFileInput}
                            onChange={handleChange}
                            className="hidden"
                        />
                    </div>
                )
            }
          
    </div>
  )
}

