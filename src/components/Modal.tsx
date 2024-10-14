import { PropsWithChildren } from "react"

const Modal = ({ id, children }: PropsWithChildren<{ id: string, className?: string }>) => {

  return (

    <div id={id} className={`absolute top-0 bottom-0 left-0 right-0 flex`}>
      <div className="w-full h-full relative">
        <div className="mx-auto">
          <div className="p-20">
              {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;