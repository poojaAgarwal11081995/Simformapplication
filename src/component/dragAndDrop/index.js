import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Logo from "../../images/x-circle.svg"
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};


function DragAndDrop({ updatedList, list, itemStyle, listStyle }) {
   
  
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const items = reorder(
            list,
            result.source.index,
            result.destination.index
        );
        updatedList(items);
    }
    const getItemStyle = (isDragging, draggableStyle) => ({
        
        ...itemStyle,
        ...draggableStyle
    });
    const getListStyle = isDraggingOver => ({
        ...listStyle
    });
    const handleDelete =(index) => {
       
        return updatedList(list.filter((i , idx)=> idx !== index ))
    }
    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                       
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {list.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}  >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <div className="all-scroll">{`${index+1}  ${item.content}`}
                                            <img style={{display:"inline-block" , float:"right"}} src={Logo} onClick={() => handleDelete(index)} />                                 
                                            </div>
                                            
                                          
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default DragAndDrop;