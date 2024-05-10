
export const onFile = async (user, e, item, createUserChallengeAction, from, shared) => {
    console.log('user.id', user.id)
    console.log('evento', e)
    console.log('item.user.id', item)
    console.log('from', from)
    console.log('createUserChallengeAction', createUserChallengeAction)
    console.log('SHARED ====>', shared)
    let file = e.target.files[0];
    if (from === 'Challenge') {
        if (file.type == "video/mp4" || file.type == "video/MOV" || file.type == "video/3GP" || file.type == "video/AVI" || file.type == "video/quicktime") {
            if (user.id) {
                let res = await createUserChallengeAction({ file: file, idchallenge: item.id, idUser: user.id, idShare: shared })

                let result = {
                    fromRes: 'from promotional',
                    data: res,
                }
                return result
            } else {
                let result = {
                    fromRes: 'noUserChallenge',
                }
                return result
            }
        } else {
            console.log('error')
        }

        if (file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/gif") {
            if (user.id) {
                let res = await createUserChallengeAction({ file: file, idchallenge: item.id, idUser: user.id, idShare: shared })

                let result = {
                    fromRes: 'from promotional',
                    data: res,
                }
                return result
            } else {
                let result = {
                    fromRes: 'noUserChallenge',
                }
                return result
            }
        } else {
            console.log('error')
        }

    } else {
        if (file.type == "video/mp4" || file.type == "video/MOV" || file.type == "video/3GP" || file.type == "video/AVI" || file.type == "video/quicktime") {
            if (user.id) {
                let res = await createUserChallengeAction({
                    /*  userId: item.user.id, */
                    file: file,
                    idchallenge: item.challenge.id,
                    idUser: user.id,
                    idShare: shared
                })

                let result = {
                    fromRes: 'from generic',
                    data: res,
                }

                return result
            } else {

                let result = {
                    fromRes: 'noUser',
                }
                return result
            }
        } else {
            console.log('error')
        }

        if (file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/gif") {
            if (user.id) {
                let res = await createUserChallengeAction({
                    /*   userId: item.user.id, */
                    file: file,
                    idchallenge: item.challenge.id,
                    idUser: user.id,
                    idShare: shared
                })

                let result = {
                    fromRes: 'from generic',
                    data: res,
                }

                return result
            } else {
                let result = {
                    fromRes: 'noUser',
                }
                return result
            }
        } else {
            console.log('error')
        }
    }
}

