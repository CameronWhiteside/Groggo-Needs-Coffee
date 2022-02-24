import { useState } from "react"
import './ModeDescription.css'

const ModeDescription = ({ activeControl }) => {

    let activeMode = `default`
    if (activeControl) activeMode = activeControl

    const [errors, setErrors] = useState([])

    const descriptions = {
        water: [`Groggo refuses to swim ever since that once traumatic lesson he had as a child, so water nodes will not have any edges connecting to other nodes.`],
        brush: [`Groggo is crap at sprinting through forests, especially when uncaffeinated. Forest nodes will increase the travel time by 20% among adjacent nodes.`],
        street: [`Streets connect two nodes with an 80% reduction on their edge weight. Groggo never turns at intersections; that's where most accidents take place, so he claims.`],
        home: [`This is the sad, coffeeless home of Groggo. His home cannot be destroyed. You'd need a permit from the city, and the permit office is closed today.`],
        shop: [`Overpriced, but it'll have to do. Oh, and Groggo finally worked up the courage to ask the barista on a date. Their shift ends in 10 minutes, so hurry.`],
        editFeatures: [`Look at all those squares! Click and drag those around to rearrange your features. All changes are saved automatically.`],
        deleteFeatures: [`Careful! Clicking on a feature will forever destroy it. If you're feeling extra desctructive, select the 'Clear All Features' button to do it in one fell swoop.`],
        pathError: [`Now Groggo can never find his coffee. Thanks for nothing. Please ensure that both his home and the shop are not placed on islands. Groggo won't be forced into the water again just for your sadistic pleasure.`],
        default: [`Click the icons below to add features to your map. When you're ready, click on the "Find Path" button to get the shortest route to the coffee shop!`],
        success: [`Groggo got his coffee! Go team! And, oop, now he's addicted. So go ahead and make another map or edit this one. Groggo will never say no to more coffee.`],
    }

    const titles = {
        water: [`Water`],
        brush: [`Forest`],
        street: [`Street`],
        home: [`Chez Groggo`],
        shop: [`Coffee Shop`],
        editFeatures: [`Edit Mode`],
        deleteFeatures: [`Delete Mode`],
        pathError: [`Uh-Oh`],
        default: [`Help Him!`],
        success:[`Hooray!`]
    }

    return (
        <div className="mode-description">
            <div className={`icon-container icon-${activeMode}`}>
            </div>
                <div className='mode-info-area'>
                    <div className="mode-title">
                        {titles[activeMode]}
                    </div>
                    <div className="mode-description">
                        {descriptions[activeMode]}
                    </div>
                    <div className="mode-error-list">
                        {errors.map(error => (
                            <div className="mode-error">{error}</div>
                        ))}
                    </div>
                </div>
        </div>
    )

}

export default ModeDescription
