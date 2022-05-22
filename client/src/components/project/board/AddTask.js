import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../../styles/components/project/board/AddTask.module.css'

export default function AddTask(props) {
    const { members } = useSelector(state => state.member)

    const {
        view, addTask
    } = props

    const [task, settask] = useState('')
    const [deadline, setdeadline] = useState('')
    const [description, setdescription] = useState('')

    const [arr, setArr] = useState(members)
    const [added, setAdded] = useState([])


    return (
        <div className={styles.containerPopup}>
            <div className={styles.popup}>
                <img src="/cancelButton.svg" alt='cancel' onClick={() => view(false)} />
                <h1>Add Task</h1>
                <div className={styles.topCtn}>
                    <div className={styles.inputfield}>
                        <label className={styles.label}>Name</label>
                        <label className={styles.label}>Deadline</label>
                    </div>
                    <div className={styles.inputfield}>
                        <input value={task} className={styles.input1} onChange={e => settask(e.target.value)} />
                        <input value={deadline} type="date" className={styles.input1} onChange={e => setdeadline(e.target.value)} />
                    </div>
                </div>
                <div className={styles.taskDescription}>
                <label className={styles.label}>Description</label>
                <textarea value={description} className={styles.description} onChange={e => setdescription(e.target.value)} />
                </div>
                <div className={styles.memberInput}>
                    <div className={styles.memberContainer}>
                        <h1>Members</h1>
                        <div className={styles.members}>
                            {arr.map((mem) => {
                                return <div key={mem.user_id} className={styles.memberCtn} onClick={() => {
                                    const tempArr = arr.filter(i => i.user_id !== mem.user_id)
                                    const tempAdd = [...added, mem]

                                    setArr(tempArr)
                                    setAdded(tempAdd)
                                }}>
                                    <img src='/me.jpeg' alt="img" />
                                    <div className={styles.memberInfo}>
                                        <p className={styles.name}>{mem.user_name}</p>
                                        <p className={styles.role}>{mem.user_role}</p>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>

                    <div className={styles.memberContainer}>
                        <h1>Added</h1>
                        <div className={styles.members}>
                            {added.map((mem) => {
                                return <div key={mem.user_id} className={styles.memberCtn} onClick={() => {
                                    const tempAdd = added.filter(i => i.user_id !== mem.user_id)
                                    const tempArr = [...arr, mem]

                                    setArr(tempArr)
                                    setAdded(tempAdd)
                                }}>
                                    <img src='/me.jpeg' alt="img" />
                                    <div className={styles.memberInfo}>
                                        <p className={styles.name}>{mem.user_name}</p>
                                        <p className={styles.role}>{mem.user_role}</p>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>

                <button className={styles.addTaskBtn} onClick={() => {
                    addTask(task, deadline, description, members)
                    view(false)
                }}>Add</button>
            </div>
        </div>
    )
}