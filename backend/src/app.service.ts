import { Injectable } from '@nestjs/common';
import { LayersModel, loadLayersModel, tensor } from '@tensorflow/tfjs-node';

@Injectable()
export class AppService {
  model: LayersModel;

  async predictMnist(input: number[]): Promise<number> {
    if (!this.model) {
      this.model = await loadLayersModel(
        'file://../model/mnist-model/model.json',
      );
    }

    const res = this.model.predict([tensor(input).reshape([1, 28 * 28])]);

    const scores = (Array.isArray(res) ? res : await res.array())[0];
    console.log('scores', scores);

    return scores.indexOf(Math.max(...scores));
  }
}
