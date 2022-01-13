import Inscription from '../../components/Inscription/Inscription';
import Connexion from '../../components/Connexion/Connexion';

import {useState} from 'react';

function Home() {

    // console.log(useState(10))
  
    const [monState, setMonState] = useState(true)
  
    const modifyState = (data) => {
      if(monState === true){
        setMonState(false);
      } else {
        setMonState(true);
      }
    }
    return (
      <div>
        <section>
         {monState ? <Inscription func={modifyState} /> : <Connexion func={modifyState} />}
        </section>
      </div>
    );
  }
  
  export default Home;