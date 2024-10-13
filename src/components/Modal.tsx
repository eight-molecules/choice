import { PropsWithChildren } from "react"

const Modal = ({ id, className, children }: PropsWithChildren<{ id: string, className?: string }>) => {

  return (

    <div id={id} className={`${className} absolute top-0 bottom-0 left-0 right-0 flex`}>
      <div className="w-full h-full relative">
        <div className="mx-auto">
          <div className="p-20">

            <div className="min-w-96 size-4/5 overflow-scroll mx-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;