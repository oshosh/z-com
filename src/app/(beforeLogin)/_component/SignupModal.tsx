'use client';
import BackButton from '@/app/(afterLogin)/_component/BackButton';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import onSubmit from '../_lib/signup';
import style from './signup.module.css';

function showMessage(message: string | null) {
  console.log('message', message);
  if (message === 'no_id') {
    return '아이디를 입력하세요.';
  }
  if (message === 'no_name') {
    return '닉네임을 입력하세요.';
  }
  if (message === 'no_password') {
    return '비밀번호를 입력하세요.';
  }
  if (message === 'no_image') {
    return '이미지를 업로드하세요.';
  }
  if (message === 'user_exists') {
    return '이미 사용 중인 아이디입니다.';
  }
  return '';
}

export default function SignupModal() {
  const [state, formAction] = useActionState(onSubmit, { message: null });
  const { pending, data, method, action } = useFormStatus();

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <form action={formAction}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor='id'>
                  아이디
                </label>
                <input
                  id='id'
                  name='id'
                  className={style.input}
                  type='text'
                  placeholder=''
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor='name'>
                  닉네임
                </label>
                <input
                  id='name'
                  name='name'
                  className={style.input}
                  type='text'
                  placeholder=''
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor='password'>
                  비밀번호
                </label>
                <input
                  id='password'
                  name='password'
                  className={style.input}
                  type='password'
                  placeholder=''
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor='image'>
                  프로필
                </label>
                <input
                  id='image'
                  name='image'
                  className={style.input}
                  type='file'
                  accept='image/*'
                  required
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button type='submit' className={style.actionButton} disabled={pending}>
                가입하기
              </button>
              <div className={style.error}>{showMessage(state?.message)}</div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
/**
 * https://nextjs.org/docs/app/api-reference/components/form#action-string-props
 *
 * NEXT 15로 넘어오면서 Form의 형태가 function action과 string action으로 나뉘었다.
 * function action은 POST에서 적절하며 string action은 GET에서 적절하다.
 *
 * Form의 string action의 경우 기존의 클라이언트 form에 비해 prefetch 가 가능하여 이동할 페이지를 미리 로드해 올 수 있음
 */
