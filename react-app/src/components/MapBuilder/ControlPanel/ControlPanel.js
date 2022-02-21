import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getMaps } from "../../../store/map";

import './ControlPanel.css'

const ControlPanel = ({
    activateLoad,
    activateClear,
    activateDelete,
    children,
    // currentMap,
    // setCurrentMap
    saveMap,
    saveText,
    activeControl,
    setActiveControl
}) => {
    // const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);

    // useEffect(() => {
    //     dispatch(getMaps(sessionUser.id))
    // }, []);

    const FeatureType = ({
        featureName,
        onClick,
        controlName
    }) => {


        return (
            <div onClick={onClick} className="feature-type">
                <div className={`feature-icon ${featureName}`}>
                    <div className={`active-feature-${controlName === activeControl}`}>
                    </div>
                </div>
                <div className="feature-name">{featureName}</div>
            </div>
        )
    }

    // const activateClear = (e) => {
    //     e.preventDefault()
    //     setClearMapMode(true)
    // }

    const toggleWater = () => {
        if (activeControl === 'water') {
            setActiveControl('')
        } else {
            setActiveControl('water')
        }
    }

    const toggleBrush = () => {
        if (activeControl === 'brush') {
            setActiveControl('')
        } else {
            setActiveControl('brush')
        }
    }

    const toggleStreet = () => {
        if (activeControl === 'street') {
            setActiveControl('')
        } else {
            setActiveControl('street')
        }
    }


    return (
        <div className="control-panel">
            {children}
            <div className="feature-container">
                <div className="feature-row top-row">
                    <FeatureType
                        featureName="Home"
                    />
                    <FeatureType
                        icon='C'
                        featureName="Shop"
                    />
                    <FeatureType
                        onClick={toggleWater}
                        controlName='water'
                        featureName='Water'
                    />
                    </div>
                <div className="feature-row top-row">
                <FeatureType
                featureName='Highway'
                />
                <FeatureType
                        controlName='street'
                        featureName='Street'
                        onClick={toggleStreet}
                    />
                <FeatureType
                        controlName='brush'
                        featureName='Brush'
                        onClick={toggleBrush}
                />
                </div>
            </div>
            <div className="cursor-container">
                <div className="cursor build">
                </div>
                <div className="cursor move">
                </div>
                <div className="cursor destroy">
                </div>
            </div>
            <div className="control-buttons">
                <button onClick={saveMap}>{saveText}</button>
                <button onClick={activateClear}>Clear Features</button>
                <button onClick={activateDelete}>Delete Map</button>
                {/* <button onClick={activateLoad}>Load Map</button> */}
            </div>
        </div>
    )
}

export default ControlPanel
