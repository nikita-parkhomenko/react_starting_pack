
// outsource dependencies
import React from 'react';

// local dependencies
import AlertError from './index';
import { PopoverError, LabelError } from '../redux-form-helpers/redux-form-control-wrap';

export default { title: 'Components/Error Message' };

export const Popover = () => <div className="p-5 text-center">
  <div className="mt-5">
    <PopoverError usePopover="top" message="test popover START" className="d-inline-block">
      <PopoverError usePopover="right" message="test popover BELOW" className="d-inline-block">
        <PopoverError usePopover="bottom" message="test popover END" className="d-inline-block">
          <PopoverError usePopover="left" message="test popover LEFT" className="d-inline-block">
            <h1 className="d-inline mt-5"> content </h1>
          </PopoverError>
        </PopoverError>
      </PopoverError>
    </PopoverError>
  </div>
  <hr className="mt-5" />
  <h4 className="mb-3"> <code> {'<PopoverError usePopover="top" message="test popover START">Trigger</PopoverError>'} </code> </h4>
  <PopoverError usePopover="top" message="test popover START">Trigger</PopoverError>
  <hr className="mt-5" />
  <h4 className="mb-3"> <code> {'<PopoverError usePopover="right" message="test popover END">Trigger</PopoverError>'} </code> </h4>
  <PopoverError usePopover="right" message="test popover END">Trigger</PopoverError>
  <hr className="mt-5" />
  <h4 className="mb-3"> <code> {'<PopoverError usePopover="bottom" message="test popover BELOW">Trigger</PopoverError>'} </code> </h4>
  <PopoverError usePopover="bottom" message="test popover BELOW">Trigger</PopoverError>
  <hr className="mt-5" />
  <h4 className="mb-3"> <code> {'<PopoverError usePopover="left" message="test popover LEFT">Trigger</PopoverError>'} </code> </h4>
  <PopoverError usePopover="left" message="test popover LEFT">Trigger</PopoverError>
  <hr className="mt-5" />
</div>;

export const Label = () => <div className="p-5">
  <h4 className="mb-3"> <code> {'<LabelError message="" />'} </code> </h4>
  <LabelError message="" />
  <hr />
  <h4 className="mb-3"> <code> {'<LabelError />'} </code> </h4>
  <LabelError />
  <hr />
  <h4 className="mb-3"> <code> {'<LabelError message="test Label" />'} </code> </h4>
  <LabelError message="test Label" />
</div>;

export const Alert = () => <div className="p-5">
  <h4 className="mb-3"> <code> {`
    <AlertError active message="test alert" onClear={() => console.log('onClear')} />
    `} </code> </h4>
  <AlertError active message="test alert" onClear={() => console.log('onClear')} />
  <hr />
  <h4 className="mb-3"> <code> {'<AlertError />'} </code> </h4>
  <AlertError />
  <hr />
  <h4 className="mb-3"> <code> {'<AlertError title="Test:" message="test alert" />'} </code> </h4>
  <AlertError title="Test:" message="test alert" />
  <hr />
</div>;
