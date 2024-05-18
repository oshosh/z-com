import dayjs from "dayjs";
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from "next/link";
import style from "./post.module.css";
import ActionButtons from "./ActionButtons";

dayjs.locale('ko');
dayjs.extend(relativeTime)

const Post = () => {
const target = {
  User: {
    id: 'elonmusk',
    nickname: 'Elon Musk',
    image: 'yRsRRjGO.jpg'
  },
  content: '내용 ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
  createdAt: new Date(),
  Images: []
}
  return (
    <article className={style.post}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link href={`/${target.User.id}`} className={style.postUserImage}>
            <img src={target.User.image} alt={target.User.nickname} />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={style.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </div>
          <div>{target.content}</div>
          <div className={style.postImageSection}>
            {/* {target.Images && target.Images.length > 0 && (
              <Link
                href={`/${target.User.id}/status/${target.postId}/photo/${target.Images[0].imageId}`}
                className={style.postImageSection}
              >
                <img src={target.Images[0]?.link} alt="" />
              </Link>
            )} */}
          </div>
          <ActionButtons />
        </div>
      </div>
    </article>
  );
};

export default Post;
