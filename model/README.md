## Python Script to train the model
- Create a python virtual environment at the root with: `python3 -m venv .venv` and source it with `source {FULL_PATH}/mnist-fullstack/model/.venv/bin/activate`
- Install the required dependencies: `pip3 install numpy tensorflow matplotlib keras tensorflowjs np_utils tensorrt`
- Play around with network configurations on `mnist-model-training.py` and then run it to generate `model.h5`.
- Active `.venv` and run the command `tensorflowjs_converter --input_format keras 'model.h5' 'mnist-model'` to generate a js compatible model
