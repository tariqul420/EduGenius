
function Title({ title, subTitle }) {
    return (
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
            <p className="mt-2 text-lg text-gray-600">{subTitle}</p>
        </div>
    )
}

export default Title