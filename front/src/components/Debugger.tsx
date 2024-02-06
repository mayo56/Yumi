import React from 'react';
import "./debugger.css"

const Debugger = (props: { debug: [string, string][] }) => {

    console.log(props)

    return (
        <div className='debugContainer'>
            <p>DEBUG</p>
            <div>
                {
                    props.debug.map(values => {
                        return (
                            <p>{values[0]}: {values[1]}</p>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Debugger;