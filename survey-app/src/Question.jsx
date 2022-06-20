import { useState } from 'react';
import Radio from './Radio';

const Question = ({ question, number }) => {
    const [value, setValue] = useState(null);

    return (
        <fieldset className='form__answer'>
            <div className='form__table-row'>
                <div className='form__table-cell'>
                    { question.question }
                </div>
                {
                    question.type === 'radio'
                    && (
                        <div className='form__table-answer'>
                            {
                                question.answers.map((answer, index) => (
                                    <Radio
                                        key={`${number}-${index}`}
                                        number={number}
                                        index={index}
                                        required={question.required}
                                        needsText={answer.needsText}
                                        title={answer.title}
                                        value={value}
                                        setValue={setValue}
                                    />
                                ))
                            }
                        </div>
                    )
                }
            </div>
            {
                question.type === 'text'
                && (
                    <input
                        type='text'
                        required={question.required}
                    />
                )
            }
            {
                question.type === 'select'
                && (
                    <>
                        <select
                            name='select'
                            required={question.required}
                            onChange={({ target }) => setValue(target.value)}
                        >
                            <option hidden value='' />
                            {
                                question.answers.map((answer, index) => (
                                    <option
                                        key={`${number}-${index}`}
                                        value={index}
                                    >
                                        {answer.title}
                                    </option>
                                ))
                            }
                        </select>
                        {
                            question.answers?.[value]
                            && !question.answers?.[value]?.needsText
                            && (
                                <input type='text' value={question.answers?.[value].title} readOnly />
                            )
                        }
                    </>
                )
            }
            {
                question.multipleQuestions?.map((subQuestion, index) => (
                    <div className='form__table-row form__subquestion' key={`${number}-${index}`}>
                        <div className='form__table-cell'>
                            { subQuestion.question }
                        </div>
                        {
                            subQuestion.type === 'radio'
                            && (
                                <div className='form__table-answer'>
                                    {
                                        subQuestion.answers.map((answer, subIndex) => (
                                            <Radio
                                                key={`${number}-${index}-${subIndex}`}
                                                number={`${number}-${index}`}
                                                index={subIndex}
                                                required={question.required}
                                                needsText={answer.needsText}
                                                title={answer.title}
                                                value={value}
                                                setValue={setValue}
                                            />
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                ))
            }
            {
                question.answers?.[value]?.needsText
                && (
                    <div className='form__subanswer'>
                        {
                            question.answers[value].textTitle
                            && (
                                <label htmlFor={`subanswer-${number}-${value}`}>
                                    {question.answers[value].textTitle}
                                </label>
                            )
                        }
                        <input
                            type='text'
                            name={`subanswer-${number}-${value}`}
                            required
                        />
                    </div>
                )
            }
        </fieldset>
    );
};
export default Question;
