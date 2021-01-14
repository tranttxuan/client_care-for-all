import React from 'react'

const UploadWidget = React.forwardRef((props, ref) => {

      const handleFileSelect = (event) => {
            //create a "fake URL"
            const file = event.target.files[0];
            const tempUrl = URL.createObjectURL(file);
            props.onFileSelect && props.onFileSelect(tempUrl)
      }
      return (
            <React.Fragment>
                  <label htmlFor={props.name}>
                        {props.children}
                  </label>
                  <input
                        onChange={handleFileSelect}
                        ref={ref}
                        className="UploadWidget"
                        id={props.name}
                        name={props.name}
                        type="file"
                  />
            </React.Fragment>
      )
})

export default UploadWidget;
