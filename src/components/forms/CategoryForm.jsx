const CategoryForm = ({ name, setForm, handleSubmit, buttonText = 'Submit', handleDelete, values }) => {

    //console.log(name)

    // const handleInputChange = (e) => {
    //     setForm((prev) => ({
    //         ...prev,
    //         [e.target.name]: e.target.value
    //     }))
    // };

    const handleInputChange = name => event => {
        setForm({ ...values, error: false, [name]: event.target.value })
    }

    return (

        <div className="p-3">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Category Name"
                    onChange={handleInputChange}
                    value={name}
                />
                <div className="d-flex justify-content-between">
                    <button className='btn btn-primary mt-3' type='submit'>
                        {buttonText}
                    </button>

                    {
                        handleDelete && (
                            <button className='btn btn-danger mt-3' type='submit' onClick={handleDelete}>
                                Delete
                            </button>
                        )
                    }
                </div>
            </form>
        </div>
    )
}

export default CategoryForm