import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';

function Csv_reader ({handleOnComplete, handleOnRemove}){

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };




    return (
        <>
        <div>
            <CSVReader
                onError={handleOnError}
                addRemoveButton
                onRemoveFile={handleOnRemove}
                config={{
                    "skipEmptyLines":true,
                    "complete": (results, file) => {handleOnComplete(results)}
                }}
            >
                <span>Drop file here or click to upload.</span>
            </CSVReader>
        </div>
        </>
    );
}

export default Csv_reader;