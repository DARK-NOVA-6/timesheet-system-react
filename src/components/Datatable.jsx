import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './Datatable.css';  

const Datatable = ({ columns, data }) => {

    return (
        <div className="responsive-table-wrapper">
            <DataTable value={data} size='small' tableStyle={{ minWidth: '100%' }}>
                {columns.map(e => (
                    <Column
                        key={e.field} 
                        field={e.field}
                        header={e.header}
                        headerStyle={{
                            backgroundColor: "#c0e3e5",
                            color: '#000',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            padding: '10px 25px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                        bodyStyle={{ padding: '25px', justifyContent: "center", whiteSpace: 'normal' }}
                    />
                ))}
            </DataTable>
        </div>
    );
};

export default Datatable;
