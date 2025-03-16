
function Title({ title, subTitle }) {
    return (
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-200">{subTitle}</p>
        </div>
    )
}

export default Title