import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStar, faPen } from "@fortawesome/free-solid-svg-icons";
import Levelbar from "./Levelbar";
import styled from "styled-components";
import ModalForm from "./ModalForm";

function Stage({ rankList, handleDelete, handleChange, handleUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState(0);
  const [selectedEditItem, setSelectedEditItem] = useState(0);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleConfirmModal = (key) => {
    setShowModal(true);
    setSelectedKey(key);
  };

  const handleDeleteModal = (key) => {
    setShowModal(false);
    handleDelete(key);
  };

  const editItem = (key) => {
    setSelectedEditItem(key);
  };

  const handleUpdateItem = () => {
    handleUpdate();
    setSelectedEditItem(0);
  };

  return (
    <Wrapper>
      <ModalForm
        title="Delete item"
        content="Do you want to delete this item?"
        handleOk={() => handleDeleteModal(selectedKey)}
        handleClose={handleClose}
        isShow={showModal}
      />
      <div className="stage">
        <h4>Stage 1</h4>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-left">Name</th>
              <th className="text-right">Point</th>
              <th className="text-center">Level</th>
              <th className="text-center">Star</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rankList &&
              rankList.map((item, k) => (
                <tr key={item.no}>
                  <td className="text-center">{k + 1}</td>
                  <td className="text-left">
                    {selectedEditItem === item.no ? (
                      <input
                        className="input-field"
                        onChange={(e) => handleChange(e, item.no)}
                        defaultValue={item.name}
                        name="name"
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="text-right">
                    {selectedEditItem === item.no ? (
                      <input
                        type="number"
                        className="input-field"
                        onChange={(e) => handleChange(e, item.no)}
                        defaultValue={item.point}
                        name="point"
                      />
                    ) : (
                      <span className={item.point < 0 ? "down-grade" : ""}>
                        {item.point}
                      </span>
                    )}
                  </td>
                  <td className="text-center">
                    <Levelbar percent={item.rate} />
                  </td>
                  <td className="text-center">
                    {k < 3 &&
                      Array.from(Array(3 - k)).map((ic, ik) => (
                        <FontAwesomeIcon
                          key={item.no + "-icon-" + ik}
                          icon={faStar}
                          color="#ffd900"
                        />
                      ))}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="edit custom-btn"
                      onClick={() => editItem(item.no)}
                    >
                      <FontAwesomeIcon icon={faPen} color="#666" />
                    </button>
                    <button
                      type="button"
                      className="delete custom-btn"
                      onClick={() => handleConfirmModal(item.no)}
                    >
                      <FontAwesomeIcon icon={faTrash} color="#666" />
                    </button>
                  </td>
                </tr>
              ))}
            {(!rankList || !rankList.length) && (
              <tr>
                <td colSpan="6" className="text-center">
                  There is no item in the list.
                </td>
              </tr>
            )}
          </tbody>
          {selectedEditItem !== 0 && (
            <tfoot>
              <tr>
                <td colSpan="5">
                  <div className="handle-button text-right">
                    <button
                      className="cancel-btn custom-btn"
                      type="button"
                      onClick={() => setSelectedEditItem(0)}
                    >
                      Cancel
                    </button>
                    <button
                      className="update-btn custom-btn"
                      type="button"
                      onClick={handleUpdateItem}
                    >
                      Update
                    </button>
                  </div>
                </td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .stage {
    margin: 40px auto;
    table {
      thead {
        th {
          background: #536fad;
          color: #fff;
          font-weight: 500;
          font-size: 16px;
          &:last-child {
            background: none;
          }
        }
      }

      tbody {
        tr {
          td {
            background: #f5f8ff;
            color: #444;
            font-size: 14px;

            .custom-btn {
              background: none;
              border: none;
              &.delete {
                &:hover {
                  svg {
                    color: #ff5757;
                  }
                }
              }

              &.edit {
                &:hover {
                  svg {
                    color: orange;
                  }
                }
              }

              &:focus {
                outline: none;
              }
            }

            .down-grade {
              color: red;
            }
          }

          &:nth-child(2n) td,
          &:nth-child(2n) th {
            background: #dce7ff;
          }
          th:last-child,
          td:last-child,
          &:nth-child(2n) th:last-child,
          &:nth-child(2n) td:last-child {
            background: none;
            border: none;
          }

          .input-field {
            padding: 3px 6px;
            border: 1px solid #999;
            width: 120px;
          }
        }
      }

      th,
      td {
        border: 2px solid #fff;
        padding: 8px;
        line-height: 16px;
        max-width: 80px;
      }
    }

    .handle-button {
      .custom-btn {
        padding: 6px 12px;
        margin-left: 10px;
        border: 1px solid #536fad;

        &.update-btn {
          color: #fff;
          background: #536fad;
        }

        &.cancel-btn {
          color: #fff;
          background: #999;
        }
      }
    }
  }
`;

export default Stage;
