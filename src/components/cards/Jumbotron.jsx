

const Jumbotron = ({title, subtitle}) => {
  
  return (
    <div className='container-fluid'>
        <div className="row">
            <div className="col text-center p-4 jumbotron">
                <h1 className="text-secondary">{title}</h1>
                <p className="lead text-secondary">{subtitle}</p>
            </div>
        </div>
    </div>
  )
}

Jumbotron.defaultProps = {
  title: 'Home',
  subtitle: 'Welcome to React E-commerce'
}

export default Jumbotron