import { useState } from "react"
import './ModeDescription.css'

const ModeDescription = ({activeMode}) => {

    const [errors, setErrors] = useState([])

    const descriptions = {
        water: [`Groggo can't swim, so water will destroy all edges with adjoining nodes and removes them from the adjacency list. To place, click and drag to form a rectangle. Water is a low-priority feature, so if other features are drawn on top of the same node, the node will no longer be considered to be water.`],
        brush: [`Though Groggo is a fan of a scenic route every now and then, he's still crap at sprinting through forests. Forest nodes will increase the distance, or weight, by a factor of 20% among adjoining nodes. Forests are a medium-priority feature. When drawn over water, the node will become forest. When drawn over roads, the road will win out.`],
        street: [`Streets can be used to create adjancencies between otherwise distant nodes, with an 80% speed bonus! However, Groggo is terrified of intersections and merging (that's where most accidents happen, he claims) and will only travel straight on a given road from its start to its finish.`],
        home: [`This is the sad, coffee-less home of Groggo. To change its location, click on another node anywhere on the map. Note that his home cannot be destroyed, and trying to remove Groggo from existence does not resolve the missing coffee issue at hand.`],
        shop: [`They don't make the best coffee here, but it'll have to do today. Only one shop is allowed per map, and to change its location, click another node anywhere on the map`],
        edit: [`Look at all those squares! Click and drag those around to rearrange your features`],
        delete: [`Hey now. Be careful. Clicking on a feature (except the home and coffee shop) will forever destroy it. If you're really feeling ambitious, feel free to select the 'clear all features' button to do it in one fell swoop.`],
        pathError: [`Now Groggo can never find his coffee. Thanks for nothing. Please ensure that both his home and the shop are not placed on islands. Groggo had a traumatic swim lesson experience growing up and won't be forced into the water again just for your sadistic pleasure.`],
        default: [`Click on any of the features to change your map, and when you're ready, click on the find path button so Groggo can get his coffee!`],
        success: [`Groggo got his coffee! Go team! And, oop, now he's addicted. So go ahead and make another map or edit this one. Groggo will never say no to more coffee.`],
    }

    const titles = {
        water: [`Water`],
        brush: [`Forest`],
        street: [`Street`],
        home: [`Groggo's Home`],
        shop: [`Coffee Shop`],
        edit: [`Edit Mode`],
        delete: [`Delete Mode`],
        pathError: [`Uh-Oh`],
        default: [`Help Groggo`],
        success:[`Hooray!`]
    }

    return (
        <div className="mode-description">
            <div className={`icon-container icon-${activeMode}`}>
                <div className='mode-info-area'>
                    <div className="mode-title">
                        {descriptions[titles].map(title => (
                            <div className="mode-title">{title}</div>
                        ))}
                    </div>
                    <div className="mode-description-list">
                        {descriptions[activeMode].map(description => (
                            <div className="mode-description">{description}</div>
                        ))}
                    </div>
                    <div className="mode-error-list">
                        {errors.map(error => (
                            <div className="mode-error">{error}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ModeDescription
