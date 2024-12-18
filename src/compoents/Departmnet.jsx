import heart from "../assets/kind.png";
import brain from "../assets/brain.png";
import kidney from "../assets/kidney.png";
import lungs from "../assets/lungs.png";
import stomach from "../assets/stomach.png";
import patie from "../assets/patie.png";

function Department() {
  return (
    <>
      <div className="specialit-right">
        <h2>Specialities</h2>
        <div className="specialit-list">
          <div className="specialit-list-hover">
            <img src={heart} alt="" />
            <span>Cardiology</span>
          </div>
          <div className="specialit-list-hover">
            <img src={brain} alt="" />
            <span>Neurosciences</span>
          </div>
          <div className="specialit-list-hover">
            <img src={kidney} alt="" />
            <span>Nephrology</span>
          </div>
          <div className="specialit-list-hover">
            
            <img src={stomach} alt="" />
            <span>Gastroenterology </span>
          </div>
          <div className="specialit-list-hover"> 
            <img src={lungs} alt="" />
            <span>pulmonology</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Department;
