/* eslint-disable */
import React from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import {dropzoneStyles} from './styles'

const Dropzone = ({handleChangeFile}) => {
    const classes = dropzoneStyles();
    return (
        <div>
                <DropzoneArea
                acceptedFiles={['image/*']}
                onChange={handleChangeFile}
                filesLimit={1}
                previewGridClasses={{
                    container: classes.previewContainer,
                    item: classes.preview,
                 }}
                />
        </div>
    )
}

export default Dropzone
