import { Context, PropsWithChildren, useContext } from "react"
import { createContext } from "react";



const Modal = (() => {
  const Context: Context<any> = createContext(undefined);
  const Element = ({ id, children, size, sizeClass }: PropsWithChildren<{ id: string, className?: string, sizeClass?: string, size?: number }>) => {
    return (

      <div id={id} className={`absolute top-0 bottom-0 left-0 right-0 flex`}>
        <div className="w-full h-full relative">
          <div className="mx-auto pt-24">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return {
    Provider: Context.Provider,
    Element
  }
})()

export default Modal;