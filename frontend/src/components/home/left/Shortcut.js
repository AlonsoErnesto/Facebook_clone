const Shortcut = ({img,link,name}) => {
   return (
      <a className="shortcut_item" rel="noreferrer" target="_blank" href={link}>
         <img src={img} alt=""/>
         <span>{name}</span>
      </a>
   )
}

export default Shortcut;

