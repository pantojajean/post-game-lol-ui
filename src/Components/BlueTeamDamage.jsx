
export default BlueTeamDamage = (props) => {
    return (
        <div className='flex-row d-flex align-items-center justify-content-end'>

            <div className='col-2 d-flex justify-content-start'>
                <img src='http://localhost:5000/cache/teams/1/icon.png' />
            </div>
            <div className='col-2 d-flex justify-content-center'>42.3K</div>

            <div className="col-8 d-flex">
                <div className="bar blue" style={{ width: '42.3%' }}>
                </div>
            </div>
        </div>
    )
}