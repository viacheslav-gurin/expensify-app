// Higher Order Component (HOC) - a component that renders another component
// The goal of a HOC is to 
//   Reuse code
//   Render hijacking
//   Prop manipulation
//   Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

// Info is just a regular component (not a HOC)
const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>Thi info is: {props.info}</p>
    </div>
);

// Regular functiont that is going to get called with the regular component (above) that we want to wrap (wrapping is below)
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isADmin && <p>This is private info. Please don't share!</p>}
            <WrappedComponent {...props} />
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (
                <WrappedComponent {...props} />
            ) : (
                <p>Please login to view the info</p>
            )}
        </div>
    )
}

// This is HOC:
const AdminInfo = withAdminWarning(Info); // мы можем заменить Info стольким количество регулярных компонентов, сколько нам понадобится добавить в adminWarning. Теперь нам надо что-то получить назад из withAdminWarning. Это что-то - это альтернативная версия регулярного компонента Info. Это что-то и есть HOC. 
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isADmin={true} info="This is the detail" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="This is the detail" />, document.getElementById('app'));