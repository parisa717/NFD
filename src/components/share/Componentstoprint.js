import * as React from "react";
import logo from "../../assets/img/logo/logo.png";

export class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { checked: false };
  }

  canvasEl;

  handleCheckboxOnChange = () =>
    this.setState({ checked: !this.state.checked });

  setRef = ref => (this.canvasEl = ref);

  render() {
    const { text } = this.props;

    return (
      <div className="bg-[#16166c] p-[20px]  min-h-screen text-[#fff] text-[16px]">
        <div>
          <img src={logo} />
        </div>
        <div className="flex">
          <span>نام :</span>
          <div>
            {text.fistName}
          </div>
        </div>

        <div className="flex">
          <span>شماره تماس:</span>
          <div>
            {text.phone}
          </div>
        </div>
        <div className="flex">
          <span>شماره موبایل:</span>
          <div>
            {text.mobile}
          </div>
        </div>
        <div className="flex">
          <span>کد پستی:</span>
          <div>
            {text.postCode}
          </div>
        </div>
        <div className="flex">
          <span>توضیحات:</span>
          <div>
            {text.discription}
          </div>
        </div>
        <div className="flex">
          <span>شهر:</span>
          <div>
            {text.city}
          </div>
        </div>
        <div className="flex">
          <span>آدرس:</span>
          <div>
            {text.fullAddress}
          </div>
        </div>
      </div>
    );
  }
}

export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
  return <ComponentToPrint ref={ref} text={props.text} />;
});
