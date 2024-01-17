import { ButtonHTMLAttributes } from 'react'
import { ClipLoader } from 'react-spinners'
import './buttons.css'

export const GenerateButton = ({ title, props, isLoading }: { title: string; props: ButtonHTMLAttributes<HTMLButtonElement>; isLoading: boolean }) => {
    return (
        <>
            <button className="button" {...props}>
                {isLoading && <ClipLoader size={20} color="#36d7b7" />}
                {title}
            </button>
        </>
    )
}
