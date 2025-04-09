import CustomImg from "../Components/CustomImg"
import { formatNumber, getDragonsUrlImgs, query, teamKDA } from "../utils"


const ObjectiveStatistics = ({ state, barons, atakhans }) => {
    const baseUrl = query('ws')
    // http://localhost:58869/cache/style/ingame/objectives/baronpit/baron.png
    console.log(barons)
    return (
        <>
            <div className="col text-center team">
                <br></br>
                <p>{teamKDA(0, state)}</p>
                <p>{formatNumber(state.scoreboard.teams[0].gold)}</p>
                <p>{state.scoreboard.teams[0].towers}</p>
                <p>
                    {state.scoreboard.teams[0].dragons.map((drake, index) => {
                        return <CustomImg key={index} src={`http://${baseUrl}${getDragonsUrlImgs(drake)}`} />
                    })}
                </p>
                <p>
                    {
                        Array.from({ length: barons[0] })
                            .map((_, index) => (<CustomImg key={index} src={`http://${baseUrl}/cache/style/ingame/objectives/baronpit/baron.png`} />))
                    }
                    {
                        <CustomImg key={0} src={`http://${baseUrl}/cache/style/ingame/objectives/atakhan/atakhan_${atakhans[0]}.png`} />
                    }
                    {
                        Array.from({ length: state.scoreboard.teams[0].grubs })
                            .map((_, index) => (<CustomImg key={index} src={`http://${baseUrl}/cache//style/ingame/objectives/baronpit/grubs.png`} />))
                    }
                </p>
            </div>
            <div className="col text-center">
                <br></br>
                <p>KDA</p>
                <p>Gold</p>
                <p>Towers</p>
                <p>Drakes</p>
                <p>Epics Monsters</p>
                {/*<p>Feats Of Strength</p>*/}
            </div>
            <div className="col text-center team">
                <br></br>
                <p >{teamKDA(1, state)}</p>
                <p >{formatNumber(state.scoreboard.teams[1].gold)}</p>
                <p >{state.scoreboard.teams[1].towers}</p>
                <p >
                    {state.scoreboard.teams[1].dragons.map((drake, index) => {
                        return <CustomImg key={index} src={`http://${baseUrl}${getDragonsUrlImgs(drake)}`} />
                    })}
                </p>
                <p >

                    {
                        Array.from({ length: state.scoreboard.teams[1].grubs })
                            .map((_, index) => (<CustomImg key={index} src={`http://${baseUrl}/cache//style/ingame/objectives/baronpit/grubs.png`} />))
                    }
                    {
                        <CustomImg key={0} src={`http://${baseUrl}/cache/style/ingame/objectives/atakhan/atakhan_${atakhans[1]}.png`} />
                    }
                    {
                        Array.from({ length: barons[1] })
                            .map((_, index) => (<CustomImg key={index} src={`http://${baseUrl}/cache/style/ingame/objectives/baronpit/baron.png`} />))
                    }

                </p>

            </div>
        </>
    )
}

export default ObjectiveStatistics