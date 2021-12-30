import React from 'react';

type Props = {
  color?: string;
  width?: number | string;
  height?: number | string;
  className?: string; // Required to apply styling via Styled-Components
} & React.SVGProps<SVGSVGElement>;

const Lab = React.forwardRef<SVGSVGElement, Props>((props, ref) => {
  const { width, height, color, ...others } = props;

  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      ref={ref}
      {...others}
    >
      <path
        d="M10.978 1.964c.19 0 .345.155.345.344 0 .19-.156.345-.345.345h-.672v5.048c0 .07-.017.121-.052.173-.138.31-.448.913-.844 1.688-1.62 3.239-4.72 9.424-4.72 10.803 0 .81.327 1.533.86 2.067l.018.017a2.903 2.903 0 0 0 2.067.862h9.683c.81 0 1.533-.345 2.067-.88a2.918 2.918 0 0 0 .88-2.066c0-1.379-3.12-7.564-4.739-10.803-.396-.793-.706-1.396-.844-1.706-.017-.051-.035-.103-.035-.155V2.653h-2.17a.346.346 0 0 1 0-.689h2.377a.626.626 0 0 0 .448-.19c.121-.12.19-.275.19-.447a.664.664 0 0 0-.19-.465.688.688 0 0 0-.448-.173H10.1a.655.655 0 0 0-.448.173.665.665 0 0 0-.19.465c0 .172.052.327.173.43l.017.018a.56.56 0 0 0 .431.189h.896Zm-.775 7.53c.069-.173.275-.242.448-.156a.345.345 0 0 1 .155.465l-.138.293-.138.293a.345.345 0 0 1-.465.155.345.345 0 0 1-.155-.465l.138-.293.155-.293Zm-.793 1.584a.346.346 0 0 1 .448-.155.345.345 0 0 1 .155.466l-.138.292c-.43.862-.878 1.723-1.275 2.55l-.172.38c-.086.171-.293.24-.465.171a.345.345 0 0 1-.155-.464l.19-.38c.413-.896.843-1.74 1.274-2.567l.138-.293Zm-3.05 6.065c-.602 1.344-1.136 2.722-1.136 3.222a2.419 2.419 0 0 0 2.412 2.412h9.682a2.419 2.419 0 0 0 2.412-2.412c0-.5-.551-1.878-1.137-3.222H6.361ZM7.516 19.4a1.17 1.17 0 0 1 1.154 1.171 1.17 1.17 0 0 1-1.154 1.172 1.173 1.173 0 0 1 0-2.343Zm2.757-1.55c.258 0 .482.206.482.481a.478.478 0 0 1-.482.466.464.464 0 0 1-.466-.466c0-.275.207-.482.466-.482Zm-.448 1.343c.379 0 .689.31.689.69a.69.69 0 0 1-.69.688c-.379 0-.689-.31-.689-.689 0-.379.31-.689.69-.689ZM9.617 2.567a1.375 1.375 0 0 1-.466-.31l-.017-.017a1.352 1.352 0 0 1-.361-.913c0-.362.138-.707.378-.948C9.393.138 9.737 0 10.1 0h4.755c.362 0 .69.138.93.379.242.241.397.586.397.948 0 .361-.155.689-.396.93-.121.138-.276.241-.448.31v5.065c.172.362.448.93.81 1.62 1.653 3.29 4.806 9.58 4.806 11.113 0 .999-.413 1.895-1.068 2.567-.672.655-1.568 1.068-2.567 1.068H7.635a3.683 3.683 0 0 1-2.55-1.051l-.017-.018A3.634 3.634 0 0 1 4 20.366c0-1.534 3.153-7.822 4.807-11.113.344-.69.637-1.258.81-1.62V2.567Z"
        fill={color}
      />
    </svg>
  );
});

Lab.defaultProps = {
  color: '#ffffff',
  width: 15,
  height: 15,
};

export default Lab;
