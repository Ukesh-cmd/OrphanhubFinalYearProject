
const ChildDetailPageWrapper = (WrappedComponent) => {
  const WrapperComponent = (props) => {
    return (
      <div>
       
        <WrappedComponent {...props} />
      </div>
    );
  };

  return WrapperComponent;
};

export default ChildDetailPageWrapper;
