import axios from 'axios';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import Bio from './Bio';
import EditDetails from './EditDetails';
import './style.css';


const Intro = ({detailss, visitor,setOtherName}) => {

   const { user } = useSelector((state) => ({...state}));
   const [details, setDetails] = useState();
   const [visible, setVisible] = useState(false);

   useEffect(() => {
      setDetails(detailss);
      setInfos(detailss);
   }, [detailss]);


   const initial={
      bio            :  details?.bio            ?   details.bio            : '',
      otherName      :  details?.otherName      ?   details.otherName      : '',
      job            :  details?.job            ?   details.job            : '',
      workplace      :  details?.workplace      ?   details.place          : '',
      hightSchool    :  details?.hightSchool    ?   details.hightSchool    : '',
      college        :  details?.college        ?   details.college        : '',
      currentCity    :  details?.currentCity    ?   details.currentCity    : '',
      hometown       :  details?.hometown       ?   details.hometown       : '',
      relationship   :  details?.relationship   ?   details.relationship   : '',
      instagram      :  details?.instagram      ?   details.instagram      : '',
   };

   const [infos, setInfos] = useState(initial);
   const [showBio, setShowBio] = useState(false);
   const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : 100);

   const handleBioChange = e => {
      setInfos({...infos, bio: e.target.value});
      setMax(100 - e.target.value.length);
   }

   const updateDetails = async () => {
      try {
         const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
            {
               infos,
            },
            {
               headers:{
                  Authorization: `Bearer ${user.token}` ,
               },
            }
         );
         setShowBio(false);
         setDetails(data);
         setOtherName(data.otherName);
      } catch (err) {
         console.log(err.response.data.message);
      }
   };
   
   const handleChange = e => {
      const { name, value } = e.target;
      setInfos({...infos,[name]:value});
      setMax(100 - e.target.value.length);
   }


   return (
      <div className='profile_card'>
         <div className='profile_card_header'> Intro </div>
         {// details?.bio && !showBio && ( 
            details?.bio && !showBio &&( 
            <div className='info_col'>
               <span className='info_text'>{details?.bio}</span>
               { !visitor && ( 
                  <button className='gray_btn hover1' onClick={()=>setShowBio(true)}>
                     Editar biografia
                  </button>
               )}
            </div>
         )}
         { !details?.bio && !showBio &&  !visitor && (
            <button className='gray_btn hover1 w100' onClick={()=>setShowBio(true)}>
               Añadir biografia
            </button>
         )}
         { showBio && 
         <Bio 
            infos={infos} 
            handleBioChange={handleChange} 
            max={max} 
            setShowBio={setShowBio} 
            updateDetails={updateDetails}
            placeholder="Agrear biografia"
            name="bio"
         />}
         { details?.job && details?.workplace ? (
            <div className='info_profile'>
               <img src="../../../icons/job.png" alt=""/>
               Trabaja como {details?.job} en {details?.workplace}
            </div>
         ) : details?.job && !details?.workplace ? (
            <div className='info_profile'>
               <img src="../../../icons/job.png" alt=""/>
               Trabaja como {details?.job}
            </div>
         ) : (details?.workplace && !details?.job && (
            <div className='info_profile'>
               <img src="../../../icons/job.png" alt=""/>
               Trabaja en {details?.workplace}
            </div>
         ))}
         {
            details?.relationship && (
               <div className='info_profile'>
                  <img src="../../../icons/relationship.png" alt=""/>
                  {details?.relationship}
               </div>
            )
         }
         {
            details?.college && (
               <div className='info_profile'>
                  <img src="../../../icons/studies.png" alt=""/>
                  Estudio en {details?.college}
               </div>
            )
         }
         {
            details?.hightSchool && (
               <div className='info_profile'>
                  <img src="../../../icons/studies.png" alt=""/>
                  Estudio en {details?.hightSchool}
               </div>
            )
         }
         {
            details?.currentCity && (
               <div className='info_profile'>
                  <img src="../../../icons/home.png" alt=""/>
                  Vive en {details?.currentCity}
               </div>
            )
         }
         {
            details?.hometown && (
               <div className='info_profile'>
                  <img src="../../../icons/home.png" alt=""/>
                  Nacion en {details?.hometown}
               </div>
            )
         }
         {
            details?.instagram && (
               <div className='info_profile'>
                  <img src="../../../icons/instagram.png" alt=""/>
                  <a href={`https://www.instagram.com/${details?.instagram}`} target="blank">
                     {details?.instagram}
                  </a>
               </div>
            )
         }
         { !visitor && <button className='gray_btn hover1 w100' onClick={()=>setVisible(true)}>Editar detalles</button>}
         { visible && !visitor && 
            <EditDetails 
               details={details} 
               handleChange={handleChange} 
               updateDetails={updateDetails}
               infos={infos}
               setVisible={setVisible}
            /> 
         }
         { !visitor && <button className='gray_btn hover1 w100'>Editar pasatiempos</button>}
         { !visitor && <button className='gray_btn hover1 w100'>Editar destacados</button>}
      </div>
   );
};

export default Intro