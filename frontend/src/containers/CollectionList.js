import React, { useState } from 'react';
import { List, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, Popover, Table } from 'antd';
import CollectionListBookCover from '../images/books.svg';

function AddCollectionForm({addCollection}) {

    const [visible, hideForm] = useState(false);

    const { handleSubmit, errors, reset, control, defaultValues } = useForm({
        defaultValues: {
            "collectionTitle" : '',
            "collectionDesc" : '',
        },
    });

    const handleVisibleChange = visible => {
        hideForm(visible)
    }

    const onSubmit = (data) => {
        // After a form submit, we usually make an axios POST request to update
        // the backend. For the sake of simplicity, we only update our frontend.
        console.log(data);
        if(!data) return;
        addCollection(
            {
                "collection_name" : data.collectionTitle, 
                "collection_desc" : data.collectionDesc, 
                "image"           : CollectionListBookCover,
            }
        )
    }

    return (
        <div>
            <Popover
                placement="topLeft"
                content={
                    <form
                    style={{ width: 500 }} 
                    className="bookForm"
                    onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="collectionTitle"
                        control={control}
                        rules={{ required: "Please enter a collection title" }}
                        as={
                        <Form.Item
                            label="Collection Title"
                            validateStatus={errors.collectionTitle && "error"}
                            help={errors.collectionTitle && errors.collectionTitle.message}
                        >
                            <Input />
                        </Form.Item>
                        }
                        style={{ 
                            paddingLeft  : 20 , 
                            paddingRight : 20 
                        }}
                    />
    
                    <Controller
                        name="collectionDesc"
                        control={control}
                        rules={{ required: "Please enter a description for the collection" }}
                        as={
                        <Form.Item
                            label="Collection Description"
                            validateStatus={errors.collectionDesc && "error"}
                            help={errors.collectionDesc && errors.collectionDesc.message}
                        >
                            <Input />
                        </Form.Item>
                        }
                        style={{ 
                            paddingLeft  : 20 , 
                            paddingRight : 20 
                        }}
                    />
                    <Button type="primary" htmlType="submit">Submit</Button>
                    <Button type="danger" onClick={() => hideForm(false)} style={{ left: 4 }}>Cancel</Button>
                    </form>
                    }
                    title="Create New Collection"
                    trigger="click"
                    arrowPointAtCenter={true}
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                    >
                <Button type="primary" style={{ left: 770, bottom: 80, position: 'relative' }}>+ Add Collection</Button>
            </Popover>
        </div>
    )
}

export default function CollectionList() {

    const [collections, updateCollections] = useState([
        {
            key: 1,
            collection_name: 'Main Collection',
            collection_desc: 'Default list provided by the platform to all users',
        },
        {
            key: 2,
            collection_name: 'Finished Collection',
            collection_desc: "List of books marked 'Read' by user",
        }
    ]);

    const columns = [
        {
            title: 'Collection Name',
            dataIndex: 'collection_name',
            key: 'collection_name',
            align: "center",
            render: collection_name => <p><b>{collection_name}</b></p>
        },
        {
            title: 'Collection Description',
            dataIndex: 'collection_desc',
            key: 'collection_desc',
        },
        {
            title: 'Actions',
            key: 'action',
            dataIndex: 'action',
            render: concern =>
              (
                <div>
                  <Button type="primary"><Link to="/books">View Collection</Link></Button>
                </div>
              )
          }
    ]

    const addCollection = (collection) => {
        const newCollection = [...collections, collection]
        updateCollections(newCollection);
    } 

    return (
        <div>
            <h1 style={{
                position: 'relative',
                right: 655,
                bottom: 25,
            }}>My Book Collections</h1>
            {/* We pass the 'addBook' function as a prop to the 'AddBookForm' component */}
            <AddCollectionForm addCollection={addCollection}/>
            <Table style={{ position: 'relative', bottom: 45, right:17, border: '2px solid black'}} dataSource={collections} columns={columns} />
        </div>
    )

}