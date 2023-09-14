
function ViewOrder(props) {

    const onClickRemove = function (salad) {
        props.button(salad);
    }

    const onClickCopy = function (salad) {
        return;
    }

    const salads = props.orderHandler['basket'].map((salad) =>
        <div>
            <br />
            <div className='bg-white border border-black' key={salad.uuid}>
                {salad.displayIngredients()}, pris: {salad.getPrice()} kr
            </div>
            <button style={{ width: 'auto' }} type="button" className="btn btn-outline-primary" onClick={() => onClickRemove(salad.uuid)}>
                Ta bort sallad
            </button>
            <button style={{ width: 'auto' }} type="button" className="btn btn-outline-danger">
                Ändra sallad
            </button>
            <button style={{ width: 'auto' }} type="button" className="btn btn-outline-success" onClick={() => onClickCopy(salad.uuid)}>
                Kopiera sallad
            </button>
        </div>
    );

    return (
        <>
            <div className='bg-white border' style={{ width: 'auto' }}>
                <b>Totalt pris: {props.orderHandler.calculatePrice()} kr</b>
            </div>
            {salads}
            <br />
            <br />
            <br />

        </>
    );
}

export default ViewOrder;