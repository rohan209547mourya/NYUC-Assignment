import React from 'react'

interface IInputProps {
    type: string
    name: string
    id: string
    placeholder: string
    required: boolean
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


const Input: React.FC<IInputProps> = ({ id,label,name,onChange,placeholder,required,type, value }) => {
    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-600 required">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                id={id}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={placeholder}
                required={required}
                onChange={onChange}
            />
        </div>
    )
}

export default Input