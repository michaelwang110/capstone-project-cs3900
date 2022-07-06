import React from 'react';
import '../Styles/ProgressBar.css';

interface ProgresBarProps {
    questionNumber: number;
    lastQ: number;
}

function ProgressBar(props: ProgresBarProps) {
    const nums = [...Array(props.lastQ + 1)].map((val, i) => i);
    return (
        <div id='displayrsurvey-progress-bar'>
            {nums.map(num => (num === props.questionNumber) ?
                <div key={num} className='displayrsurvey-q-marker displayrsurvey-finished'></div>
                :
                <div key={num} className='displayrsurvey-q-marker'></div>
            )}
        </div>
    );
}

export default ProgressBar;