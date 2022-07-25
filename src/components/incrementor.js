import * as React from "react";
import { useState, useEffect } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import Form from "react-bootstrap/Form";

const Incrementor = ({incrementorCallback}) => {

    const [beatsLH, setBeatsLH] = useState(3);
    const [beatsRH, setBeatsRH] = useState(4);
    const [tempo, setTempo] = useState(60);

    // function callback() {
    //     incrementorCallback(beatsLH, beatsRH, tempo);
    // }

    useEffect(() => {
        incrementorCallback(beatsLH, beatsRH, tempo);
        console.log(beatsLH, beatsRH, tempo);
    }, [beatsLH, beatsRH, tempo]);

    return (
        <Form>
            <InputGroup className="Beats 1">
                <FormLabel  column sm="2">
                    Beats 1
                </FormLabel>
                <FormControl
                    type="number"
                    min="0"
                    step="1"
                    value={beatsLH}
                    onChange={e => { 
                        setBeatsLH(e.target.value);
                    }}
                />
            </InputGroup>
            <InputGroup className="Beats 2">
                <FormLabel  column sm="2">
                    Beats 2
                </FormLabel>
                <FormControl
                    type="number"
                    min="0"
                    step="1"
                    value={beatsRH}
                    onChange={e => { 
                        setBeatsRH(e.target.value);
                    }}
                />
            </InputGroup>
            <InputGroup className="Tempo">
                <FormLabel  column sm="2">
                    Tempo
                </FormLabel>
                <FormControl
                    type="number"
                    min="1"
                    step="1"
                    value={tempo}
                    onChange={e => {
                        setTempo(e.target.value);
                    }}
                />
                <InputGroup.Text>bpm</InputGroup.Text>
            </InputGroup>
        </Form>
    );
};

export default Incrementor;
