import React from 'react';

interface ProgressProps {
    value: number; // Define value as a number type
}

const Progress: React.FC<ProgressProps> = ({ value }) => {
    return (
        <div className="progress-bar" style={{ width: `${value}%` }}>
            {value}%
        </div>
    );
};

export default Progress;
