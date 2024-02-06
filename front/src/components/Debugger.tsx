import React from 'react';

const Debugger = (props: { json: string }) => {

    const [debug, setDebug] = React.useState<any[]>([])
    const [test, setTest] = React.useState(JSON.parse(props.json))

    const instance = () => {
        if (!props.json) return;
        const json = JSON.parse(props.json);
        const oui: any[] = []
        for (const lol in json) {
            oui.push([lol, json[lol]])
        }
        setDebug((deb) => [...deb, [oui]]);
    }

    React.useEffect(() => {
        instance();
    }, [props.json]);

    return (
        <div className=''>
            <p>DEBUG</p>
            <div>
                {
                    debug.map((value) => {
                        return (
                            <div>
                                <p>{value[0]}: {value[1]}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Debugger;