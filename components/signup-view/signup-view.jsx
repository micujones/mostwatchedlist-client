export const SignupView = () => {
    const handleSubmit = (event) => {};

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email
                <input type="email" />
            </label>
            <label>
                Username
                <input type="text" />
            </label>
            <label>
                Password
                <input type="password" />
            </label>
            <button type="submit">SUBMIT</button>
        </form>
    );
};
