import { Dispatch, SetStateAction } from 'react'
import { HiCursorClick } from 'react-icons/hi'
import { IoIosCheckmarkCircle } from 'react-icons/io'

import './input.css'

export const CustomInput = ({
    valueToConvert,
    imageAdded,
    saveAsZip,
    resetKey,
    whiteBorder,
    include3DModel,
    setWhiteBorder,
    setValueToConvert,
    setImageAdded,
    setImageSrc,
    setSaveAsZip,
    setInclude3DModel,
}: {
    valueToConvert: string
    imageAdded: boolean
    saveAsZip: boolean
    whiteBorder: boolean
    resetKey: number
    include3DModel: boolean
    setValueToConvert: Dispatch<SetStateAction<string>>
    setImageSrc: Dispatch<SetStateAction<string | undefined>>
    setImageAdded: Dispatch<SetStateAction<boolean>>
    setSaveAsZip: Dispatch<SetStateAction<boolean>>
    setWhiteBorder: Dispatch<SetStateAction<boolean>>
    setInclude3DModel: Dispatch<SetStateAction<boolean>>
}) => {
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (file && file.type.startsWith('image/')) {
            const src = URL.createObjectURL(file)
            setImageAdded(true)
            setImageSrc(src)
        }
    }

    const handleSaveAsZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSaveAsZip(!saveAsZip)
    }
    const handleWhiteBorderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWhiteBorder(!whiteBorder)
    }
    const handleInclude3dModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInclude3DModel(!include3DModel)
    }
    return (
        <>
            <section className="inputs">
                <label className="input_label">Skriv inn tekst eller URL</label>
                <input value={valueToConvert} onChange={(e) => setValueToConvert(e.target.value)} />
                <div className="logo">
                    {imageAdded && (
                        <>
                            <div className="icon-container">
                                <IoIosCheckmarkCircle />
                                <div className="iconBg" />
                            </div>
                        </>
                    )}

                    <label htmlFor="imageInput" className={imageAdded ? 'label-added' : 'add-image-label'}>
                        {!imageAdded && (
                            <div className="icon-container">
                                <HiCursorClick />
                            </div>
                        )}
                        {imageAdded ? 'Logo er lagt til' : 'Vil du ha med logo?'}
                    </label>
                </div>

                <input key={resetKey} id="imageInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoUpload} />
                <div className="save-as-zip-option">
                    <label>
                        <input type="checkbox" checked={saveAsZip} onChange={handleSaveAsZipChange} />
                        Lagre bildene i en .zip mappe?
                    </label>
                </div>
                <div className="save-as-zip-option">
                    <label>
                        <input type="checkbox" checked={whiteBorder} onChange={handleWhiteBorderChange} />
                        Hvit kant rundt qr-koden?
                    </label>
                </div>
                <div className="save-as-zip-option">
                    <label>
                        <input type="checkbox" checked={include3DModel} onChange={handleInclude3dModelChange} />
                        Vil du ha med 3D modell?
                    </label>
                </div>
            </section>
        </>
    )
}
