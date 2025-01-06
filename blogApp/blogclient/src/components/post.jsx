import {formatISO9075} from 'date-fns'
import { Link } from 'react-router-dom';
export default function Post({_id,title,summary,author,Cover,createdAt}){
  console.log(title,summary,Cover);
    return (
        <div className="post">
          <Link to={'post/'+_id}>
          <div className="image"><img src={'http://localhost:8080/uploads/'+Cover} alt="THIS IS MY IMAGE" className="post-img" /></div>
          </Link>
          <div className="content">
          <Link to={'post/'+_id}>
          <h2 className="post-head">{title}</h2>
          </Link>
          <p className="info"><a href="" className="author"><i>{author ? author.Username : "KittuGreat"}</i>
          </a>&nbsp;&nbsp;&nbsp;&nbsp;<time>{formatISO9075(new Date(createdAt))}</time> </p>
          <p className="post-dis"> {summary}</p>
          </div>
        </div>
    );
}