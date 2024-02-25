import ins from '../images/ins.jpg'

const Header = () => {
    return(
        <div className="header">
            <img className="headimg" src={ins} />
            <div className='headtitle'>Instagram</div>
            <div className='headcon'>
                <div className='headbody'>Socialize yourself</div>
            </div>
        </div>
    )
}

export default Header
